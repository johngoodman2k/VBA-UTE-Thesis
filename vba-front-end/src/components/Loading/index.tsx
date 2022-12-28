import React from 'react'
import Lottie from 'react-lottie'
import { json } from 'stream/consumers';
import * as loading from './loading.json'
import * as finished from './finished.json'

type LoadingProps = {
    loading?: any;
}

const defaultOptions = {

    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: finished,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};
export const Loading = ({ loading }: LoadingProps) => {
    return (
        <div style={{ marginTop: '10rem' }}>

            <Lottie options={defaultOptions} height={400} width={400} />

        </div>
    )
}
