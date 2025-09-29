// 代码生成时间: 2025-09-30 03:24:27
// Import necessary Node.js modules
const fs = require('fs');
const util = require('util');

// Promisify fs.readFile for async/await usage
const readFile = util.promisify(fs.readFile);

// Define the IoT Gateway Manager class
class IoTGatewayManager {
    /**
     * Constructor to initialize the gateway manager.
     * @param {string} configFilePath - Path to the configuration file.
     */
    constructor(configFilePath) {
        this.configFilePath = configFilePath;
        this.gateways = []; // Array to store gateway information
    }

    /**
     * Loads gateway information from a configuration file.
     * @returns {Promise<void>} A promise that resolves when the file is loaded.
     */
    async loadGateways() {
        try {
            const data = await readFile(this.configFilePath, 'utf8');
            this.gateways = JSON.parse(data);
        } catch (error) {
            console.error('Error loading gateways:', error);
            throw error; // Re-throw the error to handle it upstream
        }
    }

    /**
     * Adds a new gateway to the configuration.
     * @param {object} gateway - The gateway information to add.
     * @returns {Promise<void>} A promise that resolves when the gateway is added.
     */
    async addGateway(gateway) {
        if (!gateway.id || !gateway.name) {
            throw new Error('Invalid gateway information. ID and name are required.');
        }
        this.gateways.push(gateway);
        await this.saveGateways();
    }

    /**
     * Removes a gateway from the configuration.
     * @param {string} gatewayId - The ID of the gateway to remove.
     * @returns {Promise<void>} A promise that resolves when the gateway is removed.
     */
    async removeGateway(gatewayId) {
        this.gateways = this.gateways.filter(gw => gw.id !== gatewayId);
        await this.saveGateways();
    }

    /**
     * Updates an existing gateway.
     * @param {string} gatewayId - The ID of the gateway to update.
     * @param {object} updates - The updated information for the gateway.
     * @returns {Promise<void>} A promise that resolves when the gateway is updated.
     */
    async updateGateway(gatewayId, updates) {
        const gatewayIndex = this.gateways.findIndex(gw => gw.id === gatewayId);
        if (gatewayIndex === -1) {
            throw new Error('Gateway not found.');
        }
        this.gateways[gatewayIndex] = { ...this.gateways[gatewayIndex], ...updates };
        await this.saveGateways();
    }

    /**
     * Saves the gateway information to the configuration file.
     * @returns {Promise<void>} A promise that resolves when the file is saved.
     */
    async saveGateways() {
        const data = JSON.stringify(this.gateways, null, 2);
        try {
            await fs.promises.writeFile(this.configFilePath, data, 'utf8');
        } catch (error) {
            console.error('Error saving gateways:', error);
            throw error; // Re-throw the error to handle it upstream
        }
    }

    /**
     * Gets the list of all gateways.
     * @returns {object[]} The list of gateways.
     */
    getGateways() {
        return this.gateways;
    }
}

// Example usage
(async () => {
    const manager = new IoTGatewayManager('./gateways.json');
    try {
        await manager.loadGateways();
        console.log('Loaded gateways:', manager.getGateways());
        await manager.addGateway({ id: 'gw1', name: 'Gateway 1' });
        console.log('After adding gateway:', manager.getGateways());
        await manager.updateGateway('gw1', { name: 'Updated Gateway 1' });
        console.log('After updating gateway:', manager.getGateways());
        await manager.removeGateway('gw1');
        console.log('After removing gateway:', manager.getGateways());
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();