module.exports = {
    rollup(config, options) {
        if (config.output.format === 'umd') {
            config.output.globals = {
                react: 'React'
            };
        }

        // Add terser for better minification
        config.plugins = config.plugins.map(p => {
            if (p.name === 'terser') {
                return require('rollup-plugin-terser').terser({
                    compress: {
                        pure_getters: true,
                        unsafe: true,
                        unsafe_comps: true,
                        warnings: false
                    }
                });
            }
            return p;
        });

        return config;
    },
};