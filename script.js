import { EllyGraphics } from './EllyGraphics.js';

const div = document.getElementById( 'container' );

const ellyWorks = () => {

    const ellyGraphics = new EllyGraphics({
        // width: 800,
        // height: 600,
        // dom: div
    });

    ellyGraphics.init().animate();

    ellyGraphics.add({
        type: 'box',
        position: [0,0,0],
        size: [10,10,10],
        color: 0xffff00,
    });
}

ellyWorks();