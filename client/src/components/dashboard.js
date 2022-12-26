import React from 'react';
import { useSelector } from 'react-redux';
import Products from './products';
import './styles/dashboard.css';

// helper function

const h1Styles = {
    color: "#202020",
    textShadow: "2px 2px rgb(127, 80, 245)",
    marginBottom: "2rem",
}
const Dashboard = () => {


    // redux state
    let user = useSelector((state) => state.loginStatus.isLoggedIn);


    return (
        <div>
            <br />
            <h2 style={h1Styles}>Welcome {user.name}</h2>
            <br />
            <header>
                <h1 style={h1Styles}>Our history</h1>
            </header>
            <div className="paragraph">
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu enim urna. Fusce mollis lacinia ornare. Quisque quis felis sollicitudin, elementum felis ut, blandit tortor. Quisque semper tortor sit amet libero venenatis dignissim. Sed lobortis nibh vel est efficitur, mollis gravida felis scelerisque. Vivamus augue ipsum, placerat eget turpis quis, condimentum ultricies quam. Mauris ultrices justo libero, in volutpat enim dictum ut. Praesent semper odio sit amet efficitur bibendum. Phasellus in placerat sapien. Donec ac ornare enim, et finibus orci. Duis sit amet dictum odio. Nulla facilisi. Quisque lobortis laoreet diam, sit amet feugiat lacus volutpat id. Praesent molestie ante in mauris placerat, sit amet fermentum lacus dapibus.

                    Proin feugiat tincidunt velit vel venenatis. Donec sagittis, sapien sit amet tincidunt iaculis, nisi massa interdum enim, eu pharetra arcu arcu eget tortor. Quisque sollicitudin elit odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris odio lectus, rutrum sit amet scelerisque non, tempus sit amet odio. Cras cursus libero nec viverra iaculis. Vivamus lorem tortor, ultrices non urna semper, commodo fermentum est. Curabitur sit amet quam ultricies, mollis nisl quis, rutrum mauris.

                    Etiam convallis sem ultrices risus luctus viverra. Phasellus dapibus neque condimentum velit molestie, id iaculis nunc dignissim. Duis augue metus, dapibus pretium quam sit amet, viverra porttitor est. Quisque arcu elit, malesuada id eros ac, tristique rhoncus ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc auctor vehicula metus a efficitur. Duis quis lectus pulvinar, sodales sapien ut, iaculis elit.

                    Cras eget velit quis ipsum semper varius et id lorem. Nulla tristique vulputate congue. Curabitur ut commodo lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean nibh augue, gravida id sapien in, finibus mattis magna. Donec arcu elit, dictum eu porta et, bibendum a arcu. Etiam mattis quam eget lorem fermentum ultrices. Donec ornare, augue sed commodo convallis, odio enim aliquam orci, sed varius ipsum odio sed purus.
                </p>
            </div>
            <br />
            <hr />
            <p>Copyright 2022 E-Market</p>
        </div>
    );
};

export default Dashboard;