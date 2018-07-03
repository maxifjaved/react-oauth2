import React from 'react';
import { render } from 'react-dom';
import Facebook from '../../src';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "data": {
                "id": "",
                "name": "",
                "email": "",
                "gender": "",
                "location": {
                    "id": "",
                    "name": ""
                }
            }
        };

        this.facebook = this.facebook.bind(this)
    }
    facebook(err, res) {
        if (!err) {
            this.setState({ data: res.profile })
        } else {
            this.setState({ data: 'something happen wrong' })
        }
    }


    render() {
        return <div>
            <Facebook url={'https://maxifjaved.github.io/react-oauth2/'}
                clientId={'468806966881566'}
                clientSecret={'b2226e287fca3fa4259161630666002a'}
                redirectUri={'https://maxifjaved.github.io/react-oauth2/'}
                authorizationUrl={'https://www.facebook.com/v2.5/dialog/oauth'}
                scope={'email,user_location'}
                width={300}
                height={300}
                callback={this.facebook}
                style={{ color: 'green' }}
            >
                Login With Facebook From component
            </Facebook>
            <hr />
            {JSON.stringify(this.state)}
        </div>
    }
}

render(<App />, document.getElementById("root"));
