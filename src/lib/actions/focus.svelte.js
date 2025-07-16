/**
 * Svelte action: 요소가 마운트될 때 포커스를 주고 콜백을 실행합니다.
 * @param {HTMLElement} node - 포커스를 받을 DOM 요소
 * @param {Function} callback - 포커스 시 실행할 콜백 함수
 */
export function focusOnMount(node, callback) {
  // 요소가 마운트되면 포커스 주고 콜백 실행
  node.focus();
  if (callback && typeof callback === 'function') {
    callback();
  }

  return {
    destroy() {
      // 정리 작업이 필요하면 여기에 추가
    }
  };
}