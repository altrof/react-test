import React from 'react'
import { Suspense } from 'react';
import Preloarder from './../components/common/Preloarder/Preloarder';

export const withSuspense = (Component) => {
    return (props) => { 
        return <Suspense fallback={<Preloarder />}>
              <Component {...props} />
              </Suspense>     
    }        
}
