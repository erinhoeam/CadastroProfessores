// import { environment } from './../../environments/environment';
// import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

// export class UploadConfig{
//     public uploader: FileUploader;
//     public setup() {

//         const authHeader: Array<{
//             name: string;
//             value: string;
//         }> = [];
    
//         const token = localStorage.getItem('dv.service.token');
    
//         if (token) {
//             authHeader.push({name: 'Authorization', value: `Bearer ${token}`});
//         }
//         const uploadOptions = <FileUploaderOptions>{ authToken: 'Authorization', authTokenHeader:  `Bearer ${token}`, method: 'POST' };
    
//         this.uploader = new FileUploader({ url: `${environment.urlServiceV1}upload-image`});
//         this.uploader.setOptions(uploadOptions);
    
//         return this.uploader;
//       }
// }