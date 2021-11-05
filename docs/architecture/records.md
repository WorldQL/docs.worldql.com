---
sidebar_position: 4
---

# Records

Records represent permanent alterations to a given [World](./worlds). They have the following fields:
1. UUID: A string representing the unique ID of this record.
2. Position: A 3D vector representing the position of this Record. This is optional and if omitted can be used to create Records that can be looked up by UUID directly.
3. World name: A string representing what World this record is located in.
4. Data: A string payload. Can be used however the developer wishes.
5. Flex: A byte array payload. Can be used however the developer wishes, using a Flexbuffer is recommended.

Records can be retrieved using the [RecordRead](./instructions#recordread) instruction and created using [RecordCreate](./instructions#recordcreate).


