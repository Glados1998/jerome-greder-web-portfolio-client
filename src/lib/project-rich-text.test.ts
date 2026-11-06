import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import type {Project} from '../payload-types';
import ProjectRichText from '../components/ProjectRichText';

const text = (value: string) => ({
    type: 'text', text: value, format: 0, detail: 0, mode: 'normal', style: '', version: 1,
});

function render(nodes: Project['description']['root']['children'], locale = 'fr') {
    const data: Project['description'] = {
        root: {type: 'root', children: nodes, direction: 'ltr', format: '', indent: 0, version: 1},
    };
    return renderToStaticMarkup(React.createElement(ProjectRichText, {data, locale}));
}

function link(fields: Record<string, unknown>) {
    return {
        type: 'paragraph', version: 1, children: [{
            type: 'link', version: 3, children: [text('Related project')], fields,
        }],
    };
}

test('internal project links resolve for every locale and both populated and ID-only references', () => {
    for (const locale of ['en', 'fr', 'de']) {
        for (const value of [42, {id: 42, name: 'Related project'}]) {
            const html = render([link({linkType: 'internal', doc: {relationTo: 'project', value}})], locale);
            assert.match(html, new RegExp(`href="/${locale}/projects/42"`));
            assert.doesNotMatch(html, /href="#"/);
        }
    }
});

test('missing and unsupported document links retain their text without a dead anchor', () => {
    for (const doc of [null, {relationTo: 'project', value: null}, {relationTo: 'project', value: {}}, {relationTo: 'services', value: 1}]) {
        const html = render([link({linkType: 'internal', doc})]);
        assert.match(html, /Related project/);
        assert.doesNotMatch(html, /<a[\s>]|unknown node/);
    }
});

test('external links preserve their URL and new-tab protection', () => {
    const html = render([link({linkType: 'custom', url: 'https://example.com', newTab: true})]);
    assert.match(html, /href="https:\/\/example.com"/);
    assert.match(html, /rel="noopener noreferrer"/);
    assert.match(html, /target="_blank"/);
});

test('legacy relationship nodes render readable project links instead of unknown node', () => {
    const html = render([
        {type: 'relationship', version: 2, relationTo: 'project', value: {id: 42, name: 'Previous project'}},
        {type: 'relationship', version: 2, relationTo: 'project', value: 43},
        {type: 'relationship', version: 2, relationTo: 'services', value: {id: 2, title: 'Web development'}},
    ]);
    assert.match(html, /href="\/fr\/projects\/42">Previous project<\/a>/);
    assert.match(html, /href="\/fr\/projects\/43">#43<\/a>/);
    assert.match(html, /Web development/);
    assert.doesNotMatch(html, /unknown node|href="#"/);
});

test('standard text formatting and image alt text survive the custom converters', () => {
    const html = render([
        {type: 'heading', version: 1, tag: 'h2', children: [text('Overview')]},
        {type: 'paragraph', version: 1, children: [{...text('Bold text'), format: 1}, text('<script>alert(1)</script>')]},
        {type: 'upload', version: 3, relationTo: 'media', value: {
            id: 1, url: '/project.png', alt: 'Project screenshot', mimeType: 'image/png', width: 800, height: 600,
        }},
    ]);
    assert.match(html, /<h2>Overview<\/h2>/);
    assert.match(html, /<strong>Bold text<\/strong>/);
    assert.match(html, /&lt;script&gt;/);
    assert.match(html, /alt="Project screenshot"/);
    assert.doesNotMatch(html, /<script>|unknown node/);
});
