import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import { renderHook, cleanup } from '@testing-library/react';
import { useFocusTrap } from './useFocusTrap.ts';
import React from 'react';

// Setup JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost'
});
global.window = dom.window as unknown as Window;
global.document = dom.window.document;
global.KeyboardEvent = dom.window.KeyboardEvent;
global.HTMLElement = dom.window.HTMLElement;

describe('useFocusTrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cleanup();
  });

  it('sets focus to first element when active', () => {
    document.body.innerHTML = `
      <div id="trap">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
      </div>
    `;
    const trap = document.getElementById('trap') as HTMLDivElement;

    renderHook(() => {
      const ref = useFocusTrap(true);
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = trap;
      }
      return ref;
    });


    const btn1 = document.getElementById('btn1');
    assert.strictEqual(document.activeElement, btn1);
  });

  it('cycles focus to first element when tabbing from last element', () => {
    document.body.innerHTML = `
      <div id="trap">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <button id="btn3">Button 3</button>
      </div>
    `;
    const trap = document.getElementById('trap') as HTMLDivElement;

    renderHook(() => {
      const ref = useFocusTrap(true);
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = trap;
      }
      return ref;
    });


    const btn3 = document.getElementById('btn3');

    // Focus last element directly for test setup
    btn3?.focus();
    assert.strictEqual(document.activeElement, btn3);

    // Simulate Tab key
    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    document.dispatchEvent(event);

    const btn1 = document.getElementById('btn1');
    assert.strictEqual(document.activeElement, btn1);
  });

  it('cycles focus to last element when shift-tabbing from first element', () => {
    document.body.innerHTML = `
      <div id="trap">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <button id="btn3">Button 3</button>
      </div>
    `;
    const trap = document.getElementById('trap') as HTMLDivElement;

    renderHook(() => {
      const ref = useFocusTrap(true);
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = trap;
      }
      return ref;
    });


    const btn3 = document.getElementById('btn3');

    const btn1 = document.getElementById('btn1');
    assert.strictEqual(document.activeElement, btn1);

    // Simulate Shift+Tab key
    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
    document.dispatchEvent(event);

    assert.strictEqual(document.activeElement, btn3);
  });

  it('does nothing when inactive', () => {
    document.body.innerHTML = `
      <div id="trap">
        <button id="btn1">Button 1</button>
      </div>
    `;
    const trap = document.getElementById('trap') as HTMLDivElement;

    renderHook(() => {
      const ref = useFocusTrap(false);
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = trap;
      }
      return ref;
    });


    const btn1 = document.getElementById('btn1');
    assert.notStrictEqual(document.activeElement, btn1);
  });

  it('does not error when there are no focusable elements', () => {
    document.body.innerHTML = `
      <div id="trap">
        <p>Just text</p>
      </div>
    `;
    const trap = document.getElementById('trap') as HTMLDivElement;

    renderHook(() => {
      const ref = useFocusTrap(true);
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = trap;
      }
      return ref;
    });

    assert.strictEqual(document.activeElement, document.body);
  });

  it('does not re-focus if focus is already inside the trap container', () => {
    document.body.innerHTML = `
      <div id="trap">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
      </div>
    `;
    const trap = document.getElementById('trap') as HTMLDivElement;
    const btn2 = document.getElementById('btn2');

    // Set focus to the second button before running the hook
    btn2?.focus();
    assert.strictEqual(document.activeElement, btn2);

    renderHook(() => {
      const ref = useFocusTrap(true);
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = trap;
      }
      return ref;
    });

    // It should remain on btn2, not jump to btn1
    assert.strictEqual(document.activeElement, btn2);
  });

  it('ignores other keys besides Tab', () => {
    document.body.innerHTML = `
      <div id="trap">
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
      </div>
    `;
    const trap = document.getElementById('trap') as HTMLDivElement;

    renderHook(() => {
      const ref = useFocusTrap(true);
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = trap;
      }
      return ref;
    });


    const btn2 = document.getElementById('btn2');

    // Focus last element
    btn2?.focus();
    assert.strictEqual(document.activeElement, btn2);

    // Simulate Enter key
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);

    // Focus should remain on btn2
    assert.strictEqual(document.activeElement, btn2);
  });

});
