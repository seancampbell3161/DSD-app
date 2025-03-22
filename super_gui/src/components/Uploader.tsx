import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'initial' | 'uploading' | 'success' | 'fail'>('initial');


  interface LeaseSignatureRequestDetails {
    signerEmails: string[];
    apartmentNumber: number;
    ccEmails: string[];
  }

  interface MetaData {
    title: string;
    description: string;
}
  
  const leaseSignatureRequestDetails: LeaseSignatureRequestDetails = {
    "signerEmails": [ "phunbunch@gmail.com" ],
    "apartmentNumber": 2,
    "ccEmails": [ "rubengarcia0515@gmail.com" ]
    }

  const metaData: MetaData = {
    "title": "Sample File", 
    "description": "This is a test file"
  } 


  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setStatus('uploading');

    const formData = new FormData();
    formData.append("file", selectedFile );
    formData.append("leaseSignatureRequestDetails", JSON.stringify(leaseSignatureRequestDetails) );
    formData.append("metaData", JSON.stringify(metaData) );

    console.log(selectedFile);

    try {
      const result = await fetch('/api/document/send', {
        method: 'POST',
        headers: {
          "contentType": 'application/octet-stream',
        },
        body: formData,
      });

      const data = await result.json();
      console.log(data)

      if (result.ok) {
        setStatus('success'); 
      } else {
        setStatus('fail')
      }

    } catch (error) {
      console.error(error);
      setStatus('fail');
    }

  };

  return (
    <>
      <h3 className='text-xl mt-2.5 font-[Raleway]'>Upload Tenant Lease</h3>
      <p className='font-[var(--font-body)] text-sm text-[var(--color-grey-800)] italic mb-2.5'>pdf format</p>
      <div className="flex flex-col items-center justify-center">
      <label htmlFor="file"
          className="cursor-pointer bg-[var(--color-blue)] text-[var(--color-white)] text-xl rounded-sm py-4 px-10 capitalize">
          {selectedFile ? selectedFile.name : "Choose a file"}
      </label>
      <input id="file" type="file" accept="application/pdf" onChange={onFileChange} className="hidden"/>
      </div>
      {selectedFile && (
        <section className="flex flex-col items-center mt-4 text-[var(--color-grey-800)]">
          File details:
          <ul>
            <li>Name: {selectedFile.name}</li>
            <li>Size: {selectedFile.size} bytes</li>
          </ul>
        </section>
      )}

      {selectedFile && (
        <button 
          onClick={handleUpload}
          className="mt-5 bg-[var(--color-blue)] text-white text-xl rounded-sm py-4 px-8 capitalize cursor-pointer"
        >Upload a file</button>
      )}
      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string | null }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default FileUpload;
