//import sayHello from './hello';

/*
 In order to reach functions in other classes, import them as below.
 Take a look at d3 if you want to load multiple functions into a variable. 
 */
import './index.scss';
import startQuagga from './quaggaFunctions';
import generateRandomD3Chart from './d3Functions';

//document.getElementById('root').innerHTML =generateRandomD3Chart();

generateRandomD3Chart();

