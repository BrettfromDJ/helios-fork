// Sidebar icons for the scripted product walkthroughs (ProductDemo, SqlDemo).
// Simple 24x24 shapes in the style of the Helios console's sidebar.

export const icon = (name: string) => {
  const p: Record<string, string> = {
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z" fill="currentColor"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z" fill="currentColor"/><path d="m3 13 9 5 9-5" stroke="currentColor" stroke-width="2" fill="none"/>',
    stack: '<path d="m12 4 8 4-8 4-8-4z" fill="currentColor"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4" stroke="currentColor" stroke-width="1.8" fill="none"/>',
    download: '<path d="M12 3v11m0 0-4-4m4 4 4-4M4 20h16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
    upload: '<path d="M8 16 18 6m0 0h-7m7 0v7M4 20h16" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
    grid: '<path d="M3 4h8v7H3zM13 4h8v7h-8zM3 13h8v7H3zM13 13h8v7h-8z" fill="currentColor"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
    building: '<path d="M5 3h14v18H5z" fill="currentColor"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" stroke="#fafafa" stroke-width="1.6"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" fill="currentColor"/>',
    search: '<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    panels: '<path d="M3 4h8v16H3zM13 4h8v7h-8zM13 13h8v7h-8z" fill="currentColor"/>',
    book: '<path d="M3 5c3-1 6-1 8.5 1v14C9 18 6 18 3 19zM21 5c-3-1-6-1-8.5 1v14c2.5-2 5.5-2 8.5-1z" fill="currentColor"/>',
    version: '<path d="M4 3h5v5H4zM4 16h5v5H4zM15 9.5h5v5h-5z" fill="currentColor"/><path d="M6.5 8v8M6.5 12H15" stroke="currentColor" stroke-width="2" fill="none"/>',
    updown: '<path d="m8 9 4-4 4 4M8 15l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    sync: '<path d="M20 12a8 8 0 0 1-14 5.3M4 12A8 8 0 0 1 18 6.7M18 3v4h-4M6 21v-4h4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
  };
  return `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">${p[name]}</svg>`;
};
