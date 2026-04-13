export const Progress = () => {
  return (
    <div className='fixed top-0 h-1 max-w-screen overflow-hidden w-full z-50'>
      <div className='w-full h-1.5 bg-black/20 rounded-full relative overflow-hidden'>
        <div className='absolute top-0 left-0 h-full bg-primary rounded-full animate-moving w-0' />
      </div>
    </div>
  );
};
