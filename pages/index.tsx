import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index
export function getServerSideProps() {
    return {
      // returns a redirect to an external domain `example.com`
      redirect: {
        destination: '/channels',
        permanent: false,
      },
    };
  }