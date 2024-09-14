import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('https://sticray-api.vercel.app/api/files');
        const data = await response.json();

        if (response.ok) {
          setFiles(data);
        } else {
          setError('Failed to fetch files');
        }
      } catch (err) {
        setError('Something went wrong!', err);
      }
    };

    fetchFiles();
  }, [success]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!file) {
      setError('Please choose a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('descripcion', descripcion);
    formData.append('price', price);
    formData.append('file', file);

    try {
      const response = await fetch('https://sticray-api.vercel.app/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('File uploaded successfully!');
        setTitle('');
        setDescripcion('');
        setPrice('');
        setFile(null);
        setFiles([...files, data]);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong!', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://sticray-api.vercel.app/api/files/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFiles(files.filter((file) => file._id !== id));
        setSuccess('File deleted successfully!');
      } else {
        setError('Failed to delete file');
      }
    } catch (err) {
      setError('Something went wrong!', err);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-orange-500 text-2xl md:text-3xl mb-16 font-[600] font-poppins">Upload File</h1>
      <form onSubmit={handleUpload} className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <textarea
          type="text"
          placeholder="Description"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white bg-orange p-2 rounded w-full"
        >
          Upload
        </button>
        <Link to='/login'><button className="bg-orange-500 text-white bg-orange p-2 rounded w-full">Logout</button></Link>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
      <div className="w-full max-w-lg mt-5">
        <h2 className="text-orange-500 text-xl md:text-2xl mb-4">Uploaded Files</h2>
        {files.length > 0 ? (
          <ul className="list-disc ml-5">
            {files.map((file) => (
              <li key={file._id} className="mb-2 flex items-center justify-between">
                <a
                  href={file.fileName}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.title}
                </a>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="text-red-500 ml-4"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
