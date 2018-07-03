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
            <Facebook url={'http://localhost:3000/'}
                clientId={'738536629629890'}
                clientSecret={'cd1b9ecdd9e0b4dd6c2da83cd485ed56'}
                redirectUri={'http://localhost:3000/'}
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
