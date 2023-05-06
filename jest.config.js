let vueJest = null
try {
    vueJest = require.resolve('@vue/vue2-jest')
} catch (e) {
    throw new Error(
        `Cannot resolve "@vue/vue2-jest" module. Please make sure you have installed "@vue/vue2-jest" as a dev dependency.`
    )
}

let tsJest = null
try {
    tsJest = require.resolve('ts-jest')
} catch (e) {
    throw new Error(
        'Cannot resolve "ts-jest" module. Typescript preset requires "ts-jest" to be installed.'
    )
}

module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        // tell Jest to handle *.vue files
        'vue',
    ],
    transform: {
        // process *.vue files with vue-jest
        '^.+\\.vue$': `<rootDir>/node_modules/@vue/vue2-jest`,
        '^.+\\.ts$': tsJest,
        '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$':
            require.resolve('jest-transform-stub'),
        '.*\\.(js)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    // support the same @ -> src alias mapping in source code
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/$1',
    },
    // serializer for snapshots
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: [
        // '**/tests/unit/**/*.spec.[jt]s?(x)',
        // '**/tests/**/*.spec.[jt]s?(x)',
        '**/src/**/*.(spec|test).[jt]s?(x)',
        '**/src/js/services/**/*.spec.[jt]s?(x)',
        // '**/__tests__/**/*.[jt]s?(x)',
    ],
    // https://github.com/facebook/jest/issues/6766
    // testURL: 'http://new.finaxe.ru/',
    globals: {
        'ts-jest': {
            babelConfig: true,
            isolatedModules: true,
        },
    },
    watchPlugins: [
        require.resolve('jest-watch-typeahead/filename'),
        require.resolve('jest-watch-typeahead/testname'),
    ],
}
