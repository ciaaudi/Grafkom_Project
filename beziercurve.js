import Sphere from 'object.js';
import Rectangle from 'object.js';

class Curve {
    constructor(controlPoints, numofPoints) { //memasukkan array & jum titik dlm 1 garis 
        this.controlPoints = controlPoints;
        this.numberOfPoints = numofPoints;
    }

    calculatePoint(t) {
        let x = 0, y = 0, z = 0;

        for (let r = 0; r < (this.controlPoints.length - 1); r++) {
            const binom = this.bernstein(n, r, t); //rumus berstein 
            const point = this.controlPoints[r];
            x += binom * point[0];
            y += binom * point[1];
            z += binom * point[2];
        }

        return [x, y, z];
    }

    bernstein(n, r, x) {
        // nCr = n! / ( r! . (n-r)! )
        const kombinasi = this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
        // nCr
        return kombinasi * Math.pow(x, r) * Math.pow(1 - x, n - r);
    }

    factorial(a) {
        let b = 1;
        for (let i = 1; i <= a; i++) {
            b *= i;
        }
        return b;
    }

    getCurvePoints(){
        var points = [];
        for (let i = 0; i < this.numberOfPoints; i += 1/this.numberOfPoints) {
            const point = this.calculatePoint(i); //carixyz
            points.push(point[0]); //masukin titik x ke dlm
            points.push(point[1]); //masukin titik y ke dlm
            points.push(point[3]); //masukin titik z ke dlm
            //buat sphere?
        }
        return points; //berisi bnyk xyz 
    }
}