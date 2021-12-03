const random = (min = 0, max = 1) => min + Math.floor(Math.random() * (max + 1))
const getRandomFileType = () => {
	const fileTypes = ['pdf', 'txt', 'png', 'jpg', 'doc']
	return fileTypes[random(0, fileTypes.length - 1)]
}
const randomDate = () => new Date(+(new Date()) - random(0, 10000000000)).getTime()
const randomUser = () => {
	const users = ['Admin', 'User', 'John Doe', 'Jane Doe', 'Alice']
	return users[random(0, users.length - 1)]
}
const randomID = (len = 5) => Math.random().toString(36).substr(2, 2 + len)
const getCommonData = () => ({
	id: randomID(),
	modified: randomDate(),
	favorite: !random(0, 5)
})

const getFolders = n => Array(n).fill(0).map((_, index) => ({
	...getCommonData(),
	name: `Folder ${index + 1}`,
	files: random(0, 50),
	type: 'folder'
}))

const getFiles = n => Array(n).fill(0).map((_, index) => ({
	...getCommonData(),
	name: `File ${index + 1}.${getRandomFileType()}`,
	size: random(100, 1e7),
	version: random(1, 5),
	type: 'file'
}))


const mockAPI = data => {

	return new Promise(resolve => {

		setTimeout(() => resolve(data), 800 + Math.random() * 600)

	})

}

export const APILogin = () => mockAPI(true)

export const APIUser = () => mockAPI({
	initials: 'A',
	name: 'Admin',
	favorites: [
		...getFolders(random(1, 3)),
		...getFiles(random(1, 3)).map(file => ({ ...file, parent: randomID() }))
	]
})

export const APIExplorer = (folder = 'Explorer') => mockAPI({
	folder,
	folders: getFolders(random(2, 5)),
	files: getFiles(random(5, 20))
})

export const APIFile = id => mockAPI({
	id,
	name: `Test file.${getRandomFileType()}`,
	version: random(1, 5),
	tabs: ['info', 'data', 'version', 'metadata']
})

export const APIFileInfo = id => mockAPI({
	id,
	name: `Test file.${getRandomFileType()}`,
	version: random(1, 5),
	size: random(100, 1e7),
	modified: randomDate(),
	created: randomDate()
})

export const APIFileVersion = id => mockAPI({
	id,
	versions: Array(random(2, 6)).fill(0).map((_, index) => ({
		version: index + 1,
		date: randomDate(),
		modifiedBy: randomUser(),
		status: ['deleted', 'active', 'expiring'][random(0, 2)]
	})).sort((a, b) => a.version > b.version ? -1 : 1)
})

export const APIFileMetadata = id => mockAPI({
	id,
	metadata: [
		{ name: 'Client', value: 'Test client' },
		{ name: 'Address', value: 'Fake Street, 123' },
		{ name: 'Phone Number', value: '123456789' },
		{ name: 'Expedition', value: new Date(randomDate()).toLocaleString() },
		{ name: 'Total', value: '1900 €' },
	]
})