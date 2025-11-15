export interface DownloadData {
  content: string;
  filename: string;
  fileType: 'txt' | 'pdf' | 'csv';
  mimeType: string;
  sourceToolId?: string;
}

export function prepareDownload(data: DownloadData): void {
  sessionStorage.setItem('downloadData', JSON.stringify(data));
  window.history.pushState({}, '', '/download');
  window.dispatchEvent(new PopStateEvent('popstate'));
}
