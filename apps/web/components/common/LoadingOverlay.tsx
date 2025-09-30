export default function LoadingOverlay({ isVisible, message = 'Processing...' }: { isVisible: boolean; message?: string }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{message}</h3>
          <p className="text-sm text-gray-600">Please wait while we process your request</p>
        </div>
      </div>
    </div>
  );
};