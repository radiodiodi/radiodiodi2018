import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import trans from '../../Locale';

const Quote = styled.p`
    text-align: center;
    font-style: italic;
`;

const Source = styled.p`
    text-align: right;
    margin-right: 5rem;
`;

class Sponsors extends Component {
    render() {
        return (
            <Fragment>
                <Quote>{ trans.ancientromansquote }</Quote>
                <Source>— Radiodiodi</Source>
            </Fragment>
        );
    }
}

export default Sponsors;