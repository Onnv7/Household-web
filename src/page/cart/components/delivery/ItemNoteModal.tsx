import React, { useEffect, useRef, useState } from 'react';

type ItemNoteModalProps = {
  value?: string;
  onSubmit: (text: string) => void;
  onClose: () => void;
};
function ItemNoteModal({ value, onSubmit, onClose }: ItemNoteModalProps) {
  const [note, setNote] = useState(value ?? '');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Focus vào textarea khi modal mở
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length,
      );
    }
  }, []);
  return (
    <div
      className="fixed left-0 top-0 z-10 h-[100vh] w-[100vw] bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className="absolute left-[50%] top-[50%] w-[33%] -translate-x-[50%] -translate-y-[50%] rounded-md bg-white px-8 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[22px] font-[600]">Ghi chú sản phẩm</h2>
        <textarea
          ref={textareaRef}
          name=""
          id=""
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="my-3 block h-[60px] w-[100%] resize-none rounded-sm border-[1px] px-1 outline-none outline-green-600"
        ></textarea>
        <div className="flex justify-end">
          <button
            className="mt-4 rounded-md bg-green-600 px-8 py-1 text-[20px] text-white"
            onClick={() => {
              onSubmit(note);
              onClose();
            }}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemNoteModal;
