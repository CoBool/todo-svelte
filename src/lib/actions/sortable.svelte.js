// src/lib/actions/sortable.js
import Sortable from 'sortablejs';

/**
 * Svelte action: DOM 요소에 SortableJS를 바인딩합니다.
 * @param {HTMLElement} node - Svelte가 마운트한 실제 DOM 요소(ul, div 등)
 * @param {Object} options - SortableJS 옵션 객체 (animation, onEnd 등)
 * @returns {Object} destroy 메서드 포함 (Svelte가 언마운트 시 자동 호출)
 */
export function sortable(node, options) {
    // SortableJS 인스턴스 생성
    const sortable = Sortable.create(node, options);

    return {
        destroy() {
            sortable.destroy();
        }
    };
}