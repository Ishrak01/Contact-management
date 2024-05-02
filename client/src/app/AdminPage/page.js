
"use client"
import { useDeleteContactByIdMutation, useDownloadContactsPdfQuery, useGetAllContactsQuery } from '../Features/Contact/contactApi';

const ContactManagementPage = () => {
  const { data: getAllContacts, isLoading, isError } = useGetAllContactsQuery();
  const [deleteContactById] = useDeleteContactByIdMutation();
  const { data: downloadContactsPdf, isLoading: isDownloading, isError: downloadError, refetch: refetchDownloadPdf } = useDownloadContactsPdfQuery();

  // Check if localStorage is defined
  const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

  // Use localStorage only if it's available
  const token = isLocalStorageAvailable ? localStorage.getItem("auth") : null;

  const handleDelete = (id) => {
    deleteContactById(id);
  };

  const handleDownloadPdf = () => {
    // Trigger the download PDF query only if token is available
    if (token) {
      refetchDownloadPdf();
    } else {
      // Display a message or handle the absence of token as desired
      console.log("Token is not available. Cannot download PDF.");
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching contacts</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 m-3">Contact Management</h1>
      <div className="overflow-x-auto items-center">
        {token ? (
          <>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className=''>
                {getAllContacts && getAllContacts.contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="border px-4 py-2 text-center ">{contact.name}</td>
                    <td className="border px-4 py-2 text-center">{contact.email}</td>
                    <td className="border px-4 py-2 text-center">{contact.phone}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDelete(contact._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <br/>
            </table>
            <button onClick={handleDownloadPdf} disabled={isDownloading} className='text-center border font-bold m-3 border-red-500'>
              {isDownloading ? 'Downloading...' : 'Download all'}
            </button>
          </>
        ) : (
          <div className='items-center text-center text-8xl'>
            <p1 className="text-red-600 font-extrabold justify-center">You need to Log in First</p1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManagementPage;
