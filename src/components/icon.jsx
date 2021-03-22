import "src/styles/components/icon.scss";

const AddIcon = () => (
   <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2,6h-2.4v4.8H6v2.4h4.8V18h2.4v-4.8H18v-2.4h-4.8V6z M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12C24,5.4,18.6,0,12,0z M12,21.6c-5.3,0-9.6-4.3-9.6-9.6S6.7,2.4,12,2.4s9.6,4.3,9.6,9.6C21.6,17.3,17.3,21.6,12,21.6z"/>
   </svg>
)

const CloseIcon = () => (
   <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24,2.4L21.6,0L12,9.6L2.4,0L0,2.4L9.6,12L0,21.6L2.4,24l9.6-9.6l9.6,9.6l2.4-2.4L14.4,12L24,2.4z"/>
   </svg>
)

const AddPhotoIcon = () => (
   <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.13,4.17V1.04h2.09v3.13h3.13v2.09H5.22v3.13H3.13V6.26H0V4.17H3.13z M6.26,10.43V7.3h3.13V4.17h7.3l1.91,2.09h3.31C23.06,6.26,24,7.2,24,8.35v12.52c0,1.15-0.94,2.08-2.09,2.09H5.22c-1.15,0-2.08-0.94-2.09-2.09V10.43H6.26zM13.57,19.83c2.88,0,5.22-2.34,5.22-5.22s-2.34-5.22-5.22-5.22s-5.22,2.34-5.22,5.22S10.68,19.83,13.57,19.83z M10.23,14.61c0,1.84,1.5,3.34,3.34,3.34s3.34-1.5,3.34-3.34s-1.49-3.34-3.34-3.34C11.72,11.27,10.23,12.76,10.23,14.61C10.23,14.6,10.23,14.61,10.23,14.61z"/>
   </svg>
)

const PlusIcon = () => (
   <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24,13.7H13.7V24h-3.4V13.7H0v-3.4h10.3V0h3.4v10.3H24V13.7z"/>
   </svg>
)

const ArrowLeftIcon = () => (
   <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24,10.67H5.11l4.77-4.79L8,4l-8,8l8,8l1.88-1.88l-4.77-4.79H24V10.67z"/>
   </svg>
)

export {
   AddIcon,
   CloseIcon,
   AddPhotoIcon,
   PlusIcon,
   ArrowLeftIcon
}
