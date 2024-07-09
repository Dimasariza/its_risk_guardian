export default function ncdf(x: number, mean: number = 0, std: number = 1) {
    var x = (x - mean) / std
    var t = 1 / (1 + .2315419 * Math.abs(x))
    var d =.3989423 * Math.exp( -x * x / 2)
    var prob = d * t * (.3193815 + t * ( -.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    if( x > 0 ) prob = 1 - prob
    return prob
}
