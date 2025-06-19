import { Ripple } from 'react-css-spinners'

const LoadingLogo = () => {
  return (
    <>
      <div className='flex   flex-col items-center  justify-center h-screen '>
        <Ripple 
        color='rgba(225,225,225,1)'
        size={200}
        thickness={5}
        />
        <h1 className='animate-pulse text-2xl'>Loading...</h1>
      </div>
    </>
  );
};
export default LoadingLogo;
