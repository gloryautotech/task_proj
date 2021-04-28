import React, { useEffect } from 'react';
import axios from 'axios';

import { useHistory } from "react-router";

function Home(props) {

    let history = useHistory()

    useEffect(() => {
        let userid
        function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
           userid = JSON.parse(jsonPayload).userId
        };
        parseJwt(localStorage.getItem('accessToken'))
        axios.get(`http://localhost:4000/api/v1/userdata/viewuserlist/${userid}`)
        .then(response => {
            console.log("viewuserlist", response.data.data)
            axios.get(`http://localhost:4000/api/v1/userdata/fetchuserlist/${response.data.data.email}`)
            .then(response => {
                console.log("fetchuserlist", response.data.data)
                if (!response.data.data) {
                    history.push('/signup')
                } else {

                    if (response.data.data[0]._id) {
                        if (response.data.data[0].userType == 'user') {
                            history.push('/usertask')
                        } else {
                            history.push('/round')
                        }
                    }

                }
            })
        })

    })

    return (
        <div>

        </div>
    )

}

export default Home
