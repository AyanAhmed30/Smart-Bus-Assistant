import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmToast = ({ message, onConfirm, onCancel }) => {
  const ToastContent = () => (
    <div>
      <p className="font-medium mb-2">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            toast.dismiss();
            onCancel();
          }}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-black rounded"
        >
          No
        </button>
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Yes
        </button>
      </div>
    </div>
  );

  toast.info(<ToastContent />, {
    position: 'top-center',
    autoClose: false,
    closeOnClick: false,
    closeButton: false,
    draggable: false,
  });
};

export default ConfirmToast;
