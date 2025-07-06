import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const promptToD2 = async (prompt) => {
  try { // <-- ADD THIS
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

   const instruction = `
You are a diagram code generator. Convert the following user prompt into a valid D2 diagram format.
⚠️ Important: Only return plain D2 code. Do NOT add explanations, markdown, or formatting.
D2  code only supports the following shapes:
only use these shapes in your code:
rectangle, square, parallelogram, document, queue, cylinder, package, callout, stored_data, person, diamond, oval, circle, hexagon, cloud
do not use any other shapes or text in the code
*
Here are some important rules to follow:
whenever you use the stroke or fill it must be in the style object like this:
*
style: {
  fill: lightblue
  stroke: navy
  stroke-width: 2
  stroke-dash: 5
  3d: true
  shadow: true }
this is one of the important thing you should know about d2 styling
do not add anything like , . or any text after double quoted 
Example :
text after double quoted 

 Example:
*do not add any text after double quoted
members: {
  shape: person
  label: "Members"
  attributes: [
    "member_id (PK)",
    "name",
    "address",
    "phone",
    "email"
  ]
}
write code like this:
members: {
  shape: person
  label: "Members"
  attributes: [
    "member_id (PK)"
    "name"
    "address"
    "phone"
    "email"
  ]
}

Examples:

Prompt: A sends data to B  

A -> B: sends data

Prompt: User logs in and is taken to dashboard  

User -> Login Page: login
Login Page -> Dashboard: redirect






## Rules:
- Only return D2 code. No explanations or markdown.
- Use shapes like cloud, cylinder, circle, hexagon
- Use custom colors (fill, stroke, text color)
- Use clean valid D2 syntax
- Use labels on edges like this: A -> B: label
- Use layout when appropriate


### D2 Diagram Code Snippets with Descriptions and Examples

---

#### 1. **Icons and Images**

**Purpose:** Embeds icons or images into diagrams.
**Example:**


my network: {
  icon: https://icons.terrastruct.com/infra/019-network.svg
}
github: {
  shape: image
  icon: https://icons.terrastruct.com/dev/github.svg
}

#### 2. **Diagram Title**

**Purpose:** Adds a styled title to the diagram.
**Example:**


title: Hello Friends {
  near: top-center
  shape: text
  style: {
    font-size: 29
    bold: true
    underline: true
  }
}
x -> y


#### 3. **Declaring a Shape**

**Purpose:** Creates named shapes using various syntaxes.
**Example:**


imAShape
im_a_shape
im a shape
i'm a shape
a-shape


#### 4. **SQL Tables**

**Purpose:** Represents database tables and relationships.
**Example:**


costumes: {
  shape: sql_table
  id: int {constraint: primary_key}
  silliness: int
  monster: int
  last_updated: timestamp
}

monsters: {
  shape: sql_table
  id: int {constraint: primary_key}
  movie: string
  weight: int
  last_updated: timestamp
}

costumes.monster -> monsters.id


#### 5. **Tooltips**

**Purpose:** Adds tooltips for nodes.
**Example:**

x: { tooltip: Total abstinence is easier than perfect moderation }
y: { tooltip: I can't make my satellite dish PAYMENTS! }
x -> y


#### 6. **Links**

**Purpose:** Makes nodes clickable via URLs.
**Example:**


x: I'm a Mac {
  link: https://apple.com
}
y: And I'm a PC {
  link: https://microsoft.com
}
x -> y: gazoontite

#### 7. **Customizing Shape Type**

**Purpose:** Assigns specific shapes to elements.
**Example:**


donut: { shape: circle }
database.shape: cylinder
you: {
  shape: person
}

#### 8. **Connections**

**Purpose:** Shows directional relationships between elements.
**Example:**


dogs -> cats -> mice: chase
replica 1 <-> replica 2
a -> b: To err is human, to moo bovine {
  source-arrowhead: 1
  target-arrowhead: * {
    shape: diamond
  }
}

#### 9. **UML Class Diagram**

**Purpose:** Represents classes with fields and methods.
**Example:**


D2 Parser: {
  shape: class
  +reader: io.RuneReader
  readerPos: d2ast.Position
  -lookahead: "[]rune"
  "#peekn(n int)": (s string, eof bool)
  +peek(): (r rune, eof bool)
  rewind()
  commit()
}

#### 10. **Root Styles**

**Purpose:** Applies global styling.
**Example:**

style: {
  fill: Beige
  stroke: DarkBlue
  stroke-width: 8
  double-border: true
  fill-pattern: lines
}
#### 11. **Markdown Content**

**Purpose:** Embeds Markdown-formatted notes.
**Example:**


report: |md
  # Report card

  - Computer science: B
  - Diagram making: A+
|

#### 12. **Containers**

**Purpose:** Groups related nodes.
**Example:**

good chips: {
  doritos
  ruffles
}
bad chips.lays
bad chips.pringles
chocolate.chip.cookies

#### 13. **Class-Based Styling**

**Purpose:** Applies reusable styling with class references.
**Example:**


classes: {
  shiny orb: {
    label: ""
    shape: circle
    width: 40
    style: {
      fill: yellow
      shadow: true
    }
  }
}

x.class: shiny orb
y.class: shiny orb
z.class: shiny orb

#### 14. **Code Blocks**

**Purpose:** Embeds code snippets.
**Example:**


explanation: |go
  awsSession := From(c.Request.Context())
  client := s3.New(awsSession)
  ctx, cancelFn := context.WithTimeout(c.Request.Context(), AWS_TIMEOUT)
  defer cancelFn()
|

#### 15. **Sequence Diagrams**

**Purpose:** Models conversations between entities.
**Example:**


shape: sequence_diagram
alice -> bob: What does it mean\nto be well-adjusted?
bob -> alice: The ability to play bridge or\ngolf as if they were games.

#### 16. **LaTeX Blocks**

**Purpose:** Embeds mathematical expressions.
**Example:**


plankton -> formula: will steal
formula: {
  equation: |latex
    \lim_{h \rightarrow 0 } \frac{f(x+h)-f(x)}{h}
  |
}

#### 17. **Styling Nodes and Edges**

**Purpose:** Applies advanced styling per node/edge.
**Example:**


x: {
  style: {
    stroke: "#53C0D8"
    stroke-width: 5
    shadow: true
  }
}

y: {
  style: {
    opacity: 0.6
    fill: red
    3d: true
    stroke: black
  }
}

x -> y: {
  style: {
    stroke: green
    opacity: 0.5
    stroke-width: 2
    stroke-dash: 5
  }
}

#### 18. **Grid Layouts**

**Purpose:** Places nodes in a grid.
**Example:**


grid-rows: 2
Executive
Legislative
Judicial
The American Government.width: 400

#### 19. **Variable Injection**

**Purpose:** Defines and uses variables dynamically.
**Example:**


vars: {
  name: Joe
  colors: {
    primary: "#065535"
  }
}



#### 20. **Layout Direction**

**Purpose:** Controls diagram flow direction.
**Example:**

direction: right
x -> y -> z: onwards!

#### 21. **Wildcard Styling (Globs)**

**Purpose:** Applies styles to multiple nodes using wildcard.
**Example:**

x
y
z
*.style.fill: yellow
x -> *
here is the code example for generating a diagram for making a flow chart diagram for finding the largest number among three number in that use different shapes for different purposes  :
*
direction: down

start: "Start" {shape: hexagon}
get_num1: "Get first number" {shape: cloud}
get_num2: "Get second number" {shape: cloud}
get_num3: "Get third number" {shape: cloud}
compare1: "Compare num1 and num2" {shape: circle}
compare2: "num1 > num2?" {shape: diamond}
compare2_else: "num1 <= num2" {shape: diamond}
compare3: "Compare Largest and num3" {shape: circle}
output: "Output Largest" {shape: cylinder}

start -> get_num1
get_num1 -> get_num2
get_num2 -> get_num3
get_num3 -> compare1
compare1 -> compare2: "num1 > num2?"
compare1 -> compare2_else: "No"

compare2 -> compare3: "Yes (Largest = num1)"
compare2_else -> compare3: "Largest = num2"

compare3 -> output: "num3 > Largest? → Largest = num3" *
form this example of generating a diagram for making a flow chart diagram for finding the largest number among three number in that use different shapes for different purposes you can have the idea of different shapes which supports d2 
 and here is the example how you should generate sql type of digrams 
 *books: {
  shape: sql_table
  title: "Books"
  columns: [
    "isbn (PK)"
    "title"
    "author"
    "genre"
    "publication_year"
    "available_copies"
  ]
}

members: {
  shape: sql_table
  title: "Members"
  columns: [
    "member_id (PK)"
    "name"
    "address"
    "phone"
    "email"
  ]
}

loans: {
  shape: sql_table
  title: "Loans"
  columns: [
    "loan_id (PK)"
    "member_id (FK)"
    "isbn (FK)"
    "loan_date"
    "due_date"
    "return_date"
  ]
}

books -> loans
members -> loans
*
here is the list of shapes which supports d2 only use these shapes in your code
*direction: right

rectangle: {
  label: "rectangle"
  shape: rectangle
}

square: {
  label: "square"
  shape: square
}

parallelogram: {
  label: "parallelogram"
  shape: parallelogram
}

document: {
  label: "document"
  shape: document
}

queue: {
  label: "queue"
  shape: queue
}

cylinder: {
  label: "cylinder"
  shape: cylinder
}

package: {
  label: "package"
  shape: package
}

callout: {
  label: "callout"
  shape: callout
}

stored_data: {
  label: "stored_data"
  shape: stored_data
}

person: {
  label: "person"
  shape: person
}

diamond: {
  label: "diamond"
  shape: diamond
}

oval: {
  label: "oval"
  shape: oval
}

circle: {
  label: "circle"
  shape: circle
}

hexagon: {
  label: "hexagon"
  shape: hexagon
}

cloud: {
  label: "cloud"
  shape: cloud
}

of_person: {
  label: "of person"
  shape: person
}
*
here the things you can do with d2 styling 
*
node1: {
  label: "Styled Node"
  shape: rectangle
  style: {
    fill: lightblue
    stroke: navy
    stroke-width: 2
    stroke-dash: 5
    3d: true
    shadow: true
    font-size: 14
    opacity: 0.9
  }
}
*
these are all elements which comes under d2 styling
style: {
fill: lightblue
    stroke: navy
    stroke-width: 2
    stroke-dash: 5
    3d: true
    shadow: true
    font-size: 14
    opacity: 0.9
  }
anything you use from the above styling should be in the style object like this
 style: {
    fill: lightblue
    stroke: navy
    stroke-width: 2
    stroke-dash: 5
    3d: true
    shadow: true
    font-size: 14
    opacity: 0.9
  }

*books: {
  style : {
  shape: sql_table
  fill: lightblue
  stroke: navy
  }
  label: "Books"
  columns: [
    "isbn (PK)"
    "title"
    "author"
    "genre"
    "publication_year"
    "available_copies"
  ]
}
  *
This will apply to all nodes and edges unless they override it locally.
do not add any text after double quoted
*
pie_chart: {
  slices: [
    {value: 5, label: "5 acres"},
    {value: 5, label: "5 acres"},
    {value: 5, label: "5 acres"},
    {value: 5, label: "5 acres"},
    {value: 5, label: "5 acres"},
    {value: 5, label: "5 acres"}
  ]
  title: "30 Acres Divided into 6 Equal Parts"
}
*
make sure to use the correct syntax for D2 diagrams, like this: not adding any text after double quoted
pie_chart: {
  slices: [
    {value: 5, label: "5 acres"}
    {value: 5, label: "5 acres"}
    {value: 5, label: "5 acres"}
    {value: 5, label: "5 acres"}
    {value: 5, label: "5 acres"}
    {value: 5, label: "5 acres"}
  ]
  title: "30 Acres Divided into 6 Equal Parts"
}

direction: down

start: "Start" {
  shape: hexagon
  style: {
    fill: lightgreen
    shadow: true
  }
}

input_num1: "Input num1" {
  shape: cloud
  style: {
    fill: lightblue
  }
}

input_num2: "Input num2" {
  shape: cloud
  style: {
    fill: lightblue
  }
}

input_num3: "Input num3" {
  shape: cloud
  style: {
    fill: lightblue
  }
}

check1: "Is num1 > num2?" {
  shape: diamond
  style: {
    fill: lightcoral
  }
}

set_max12_num1: "Set max = num1" {
  shape: rectangle
  style: {
    fill: lightyellow
  }
}

set_max12_num2: "Set max = num2" {
  shape: rectangle
  style: {
    fill: lightyellow
  }
}

check2: "Is max > num3?" {
  shape: diamond
  style: {
    fill: lightcoral
  }
}

set_max_final: "Set max = num3" {
  shape: rectangle
  style: {
    fill: lightyellow
  }
}

output: "Output max" {
  shape: cylinder
  style: {
    fill: lightpink
  }
}

start -> input_num1
input_num1 -> input_num2
input_num2 -> input_num3
input_num3 -> check1

check1 -> set_max12_num1: "yes"
check1 -> set_max12_num2: "no"

set_max12_num1 -> check2
set_max12_num2 -> check2

check2 -> output: "yes"
check2 -> set_max_final: "no"
set_max_final -> output
✅ What Was Fixed
Replaced invalid shorthand:
❌ style: filled, fill: color
✅ Used style as an object: style: { fill: color }

Ensured shape is outside and style is inside

Kept your logic 100% intact


❌ What You Were Using (Incorrect in D2)

borrow_book: "Borrow book" {shape: cloud style: {fill: lightblue}}
❌ Why It's Wrong:
You're mixing shape and a composite style object inline.

In D2, fields like shape and style must be split into a block if you're using nested styles.

The {...} after the label is not allowed to contain nested objects inside fields (like style: {fill: ...}).

✅ What You Should Use (Correct D2 Syntax)

borrow_book: "Borrow book" {
  shape: cloud
  style: {
    fill: lightblue
  }
}
✅ Why This Works:
shape is declared clearly on its own line.

style is a proper nested object using { ... }.

This is the D2-approved way to set visual styles using modern features like fill, stroke, shadow, etc.

❌ What You Were Using (Incorrect in D2):
  shape: database
✅ What You Should Use (Correct D2 Syntax)
  shape: cylinder



Now convert this prompt:
"${prompt}"

Only return the valid D2 code.
  `
     

    const result = await model.generateContent(instruction)
    const response = await result.response
    const text = response.text().trim()

    console.log('🧠 Gemini Raw Output:\n', text)

    return text
      .replace(/```d2|```/g, '')
      .trim()

  } catch (error) { // <-- AND ADD THIS
    // This block runs if the API call fails for any reason.
    console.error("Error calling Gemini API:", error);
    // Throw a new, more specific error that the rest of your application can handle.
    throw new Error("Failed to generate diagram from AI service.");
  }
}











