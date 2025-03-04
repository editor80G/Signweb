const captureIpMiddleware = (req, res, next) => {
    let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // If the IP address is in IPv6 format, convert it to IPv4
    if (ipAddress.includes('::ffff:')) {
        ipAddress = ipAddress.split('::ffff:')[1];
    }

    // If the IP address is still "::1", convert it to "127.0.0.1"
    if (ipAddress === '::1') {
        ipAddress = '127.0.0.1';
    }

    req.body.ipAddress = ipAddress;
    next();
};

export default captureIpMiddleware;