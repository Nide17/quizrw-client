import React, { Component } from 'react';
class SquareAd extends Component {
    googleInit = null;

    componentDidMount() {

        this.googleInit = setTimeout(() => {
            if (typeof window !== 'undefined')
                (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, 400);
    }

    componentWillUnmount() {
        if (this.googleInit) clearTimeout(this.googleInit);
    }

    render() {
        return (
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-8918850949540829"
                data-ad-slot="8174811139"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        );
    }
}

export default SquareAd;
