import React from 'react'
import { hasRequiredSettings } from './util/common'
import * as google from './util/google'
import * as linkedin from './util/linkedin'

let providers = { google, linkedin }

export default class SocialAuth extends React.Component {
    constructor(props) {
        super(props)
        hasRequiredSettings(this.props)
    }

    componentDidMount() {
        providers[this.props.provider].onMount(this.props)
    }

    clickHandler() {
        providers[this.props.provider].onClick(this.props)
    }

    render() {
        let { component: Component } = this.props
        return <Component onClick={this.clickHandler.bind(this)} />
    }
}