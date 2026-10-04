const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "test.txt");

function runFileManager() {
    console.log("[ASYNC] File manager started.");

    fs.writeFile(filePath, "Smart Utility Toolkit\n", "utf8", (writeError) => {
        if (writeError) {
            console.log("Create error:", writeError.message);
            return;
        }
        console.log("[CREATE] test.txt created.");

        fs.appendFile(filePath, "This line was added later.\n", "utf8", (appendError) => {
            if (appendError) {
                console.log("Update error:", appendError.message);
                return;
            }
            console.log("[UPDATE] test.txt updated.");

            fs.readFile(filePath, "utf8", (readError, data) => {
                if (readError) {
                    console.log("Read error:", readError.message);
                    return;
                }
                console.log("[READ] File contents:");
                console.log(data.trim());

                fs.unlink(filePath, (deleteError) => {
                    if (deleteError) {
                        console.log("Delete error:", deleteError.message);
                        return;
                    }
                    console.log("[DELETE] test.txt deleted.");

                    // Graceful error handling for a missing file.
                    fs.readFile(filePath, "utf8", (missingError) => {
                        if (missingError) {
                            console.log("[EXPECTED ERROR] Missing file handled gracefully.");
                        }
                    });
                });
            });
        });
    });
}

if (require.main === module) {
    runFileManager();
}

module.exports = { runFileManager };
