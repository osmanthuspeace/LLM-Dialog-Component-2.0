import { useState } from 'react';
import './FileCard.css';
import './iconfont.js';

type FileIconMap = {
  [key: string]: string;
  default: string;
};

type FileStatus = 'uploading' | 'uploaded' | 'failed';

type FileType = {
  uid: string;
  name: string;
  size: number;
  description?: string;
  status?: FileStatus;
  percent?: number;
  url?: string;
};

type FileCardProps = {
  file: FileType | null;
  showImg?: boolean;
  onClick?: (file: FileType | null) => void;
};

const fileIconMap: FileIconMap = {
  mp3: '#icon-audio',
  wav: '#icon-audio',
  xls: '#icon-excel',
  xlsx: '#icon-excel',
  csv: '#icon-csv',
  html: '#icon-html',
  pdf: '#icon-pdf',
  mp4: '#icon-mp',
  ppt: '#icon-ppt',
  pptx: '#icon-ppt',
  mov: '#icon-video',
  txt: '#icon-txt',
  zip: '#icon-zip',
  doc: '#icon-word',
  docx: '#icon-word',
  xml: '#icon-xml',
  jpg: '#icon-image',
  jpeg: '#icon-image',
  png: '#icon-image',
  gif: '#icon-image',
  bmp: '#icon-image',
  default: '#icon-unknown',
};

const imgTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

export default function FileCard({ file, showImg, onClick }: FileCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const lastDotIndex = file?.name?.lastIndexOf('.');
  const fileType =
    lastDotIndex !== -1 ? file?.name?.substring(lastDotIndex + 1) : '';
  const iconHref = fileIconMap[fileType] || fileIconMap.default;

  function formatFileSize(bytes: number) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  return (
    file && (
      <div onClick={() => onClick && onClick(file)} key={file.uid}>
        {imgTypes.includes(fileType) && showImg && file.url ? (
          <img src={file.url} alt={file.name} className="file-image" />
        ) : (
          <div className="file">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={iconHref}></use>
            </svg>
            <div className="file-info">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {isVisible && <div className="tooltip">{file.name}</div>}
                <div
                  className="file-name"
                  onMouseEnter={() => setIsVisible(true)}
                  onMouseLeave={() => setIsVisible(false)}
                >
                  {file.name}
                </div>
              </div>

              <div className="file-more">
                {file?.status === 'uploading'
                  ? `${file?.percent}%`
                  : file.description
                    ? `${file.description}`
                    : `${fileType} ${formatFileSize(file.size)}`}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
