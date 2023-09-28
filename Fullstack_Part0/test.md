```mermaid
graph LR
    subgraph Browser
        click(Save Button)
        input[User Writes Something]
    end

    subgraph Server
        db(Database)
    end

    click -->|1. User interaction| input
    input -->|2. Submit Data| click
    click -->|3. Send Data to Server| db
    db -->|4. Store Data| db
    db -->|5. Respond with Confirmation| click
    click -->|6. Update UI| input
```