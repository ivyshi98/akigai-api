"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const sequence_1 = require("./sequence");
const repository_1 = require("@loopback/repository");
/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
const boot_1 = require("@loopback/boot");
/* tslint:enable:no-unused-variable */
class AkigaiApiApplication extends boot_1.BootMixin(repository_1.RepositoryMixin(rest_1.RestApplication)) {
    constructor(options) {
        //super(options);
        //if port envrioment is null, go to 3000 
        super({
            rest: {
                port: process.env.PORT || 3000
            }
        });
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // var dataSourceConfig = new juggler.DataSource({
        //   name: "db",
        //   connector: "loopback-connector-mysql",
        //   host: 'localhost',
        //   port: 3306,
        //   database: 'akigai',
        //   user: 'root',
        //   password: 'Qaz123pl,',
        // });
        // this.dataSource(dataSourceConfig);
        var dataSourceConfig = new repository_1.juggler.DataSource({
            name: "db",
            connector: "loopback-connector-mysql",
            host: process.env.DATABASE_HOST,
            port: 3306,
            database: 'akigai',
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        });
        this.dataSource(dataSourceConfig);
        // var dataSourceConfig = new juggler.DataSource({
        //   name:"db",
        //   connector:'memory'
        // });
        //this.dataSource(dataSourceConfig);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    async start() {
        await super.start();
        const server = await this.getServer(rest_1.RestServer);
        const port = await server.get(rest_1.RestBindings.PORT);
        console.log(`Server is running at http://127.0.0.1:${port}`);
        console.log(`Try http://127.0.0.1:${port}/ping`);
    }
}
exports.AkigaiApiApplication = AkigaiApiApplication;
//# sourceMappingURL=application.js.map