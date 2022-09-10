import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index
export function getStaticProps() {
    return {
      // returns a redirect to an internal page `/another-page`
      redirect: {
        destination: '/channels',
        permanent: false,
      },
    };
  }