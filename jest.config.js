module.exports = {
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
	transform: {
		'^.+\\.(t|j)sx?$': ['@swc-node/jest'],
	},
};
