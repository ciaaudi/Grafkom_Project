class Curve {
    constructor(controlPoints, numofPoints) { //memasukkan array & jum titik dlm 1 garis 
        this.controlPoints = controlPoints;
        this.numberOfPoints = numofPoints;
    }

    calculatePoint(t) {
        let x = 0, y = 0, z = 0;
        const n = this.controlPoints.length - 1;
        for (let r = 0; r <= n; r++) {
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

    getCurvePoints() {
        var points = [];
        const startPoint = this.calculatePoint(0); // hitung titik awal kurva
        points.push(startPoint[0], startPoint[1], startPoint[2]); // masukin titik awal ke array
    
        for (let i = 1 / this.numberOfPoints; i <= 1; i += 1 / this.numberOfPoints) { // Mulai dari i = 1/numberOfPoints
            const point = this.calculatePoint(i); // hitung titik kurva
            points.push(point[0], point[1], point[2]); //return xyz
            //buat sphere
        }
        return points;
    }
}