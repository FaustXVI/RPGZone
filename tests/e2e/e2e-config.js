exports.config = {

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['**/*spec.js'],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};