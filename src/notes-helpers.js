export const findFolder = (folders = [], folderId) =>
  folders.find(folder => folder.id === parseInt(folderId));

export const findNote = (notes = [], noteId) =>
  notes.find(note => note.id === parseInt(noteId));

export const getNotesForFolder = (notes = [], folderId) =>
  !folderId
    ? notes
    : notes.filter(note => note.folder_id === parseInt(folderId));

export const countNotesForFolder = (notes = [], folderId) =>
  notes.filter(note => note.folder_id === parseInt(folderId)).length;

export function randomId() {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }
  let key = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });

  return key;
}
