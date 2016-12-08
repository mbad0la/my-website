I did my summer intern with [Precog](http://precog.iiitd.edu.in/). Here is an account of my experience about the same. But first, let's get you upto speed.

## What is Precog
The website describes Precog in the following light

> Precog is a group of researchers at Indraprastha Institute of Information Technology - Delhi, who study, analyze, and build different aspects of social systems (e.g. social web systems like Twitter, Facebook), including their security and privacy. By understanding and measuring complex networks, they try and build solutions for social good. Their work primarily derives from Data Science, Computational Social Science, Social Computing, Machine Learning, and Natural Language Processing.

My internship involved working on an Online Social Media Monitoring tool, developed at IIIT-D. The OSM Analytics platform is deployed at 45+ state and federal government agencies.

## My Involvement
My internship at Indraprastha Institute of Information Technology - Delhi, spanned two months. Work at Precog is always intense, with strict deadlines. We had weekly presentations, wherein we had to give a progress report to PK and our goals for the next week’s presentation were decided thereafter.

Being an avid software developer, I had prior experience in different technologies and languages. Hence during the intern I got to use my skills in Python, Ruby, and JavaScript. Version control is an obvious thing to use, which I knew beforehand. Apart from this, I got to learn a thing or two about deploying enterprise software on standalone servers.  

As my work and involvement is covered under a non-disclosure agreement, I won’t be able to detail everything, so, I’ll discuss them vaguely.

### Query Review
My first task at Precog was to analyse existing database queries used in the analytics tool, identifying better alternatives or bugs.

This task helped me in understanding the data analysed and visualised in the social media analytics tool and the corresponding database queries triggered.

With the help of various auditing softwares and in-built functionalities of the stack software, I was able to identify pain points in the software that were causing serious overheads in terms of request-response cycle.

Because of my thorough inspection of the software, I was also able to identify an incorrect query pushed into production. A quick commit resolved that bug and this task was super successful.

### Database Optimisations
My second task followed up on optimising painful queries through any possible database optimisations.

With the help of indexer and analyser tools and in-built query processing analysis, possible indexing opportunities were identified. Taking into consideration the queries and the possible speed-storage tradeoff, database was indexed appropriately resulting in 25% speed-up on database responses.

Log rotation policy was updated to reduce ineffective use of space on production server and replication was also considered to improve availability.

### Environment Setup Script
I took up this task on my own personal time as I was quite familiar with the pain of setting up a development environment for any project and I had to go through all of it again, only on a much larger scale at my internship.

To ease this step for new people at the project, I decided to create a shell script for debian-based systems. My script played a crucial role in setting up the environments for the new Research Assistants, helping them to focus on other pressing issues.

The script was in bash and provisioned the entire environment required for the analytics tool’s development.

### New Feature Implementation I
Feature implementation tasks were the long term tasks which were supposed to be done in a month i.e. be production ready at the end.

The first feature I introduced had direct client-side interactions as it gave the client the ability to upload data to ingest into our backend pipeline. I made use of Ruby and Redis : an in-memory datastore, along with some user interface changes to see through this task.

### New Feature Implementation II
Feature II revolved around a new type of data analysis, for which I had to decide the entire architecture and code it out too. This new feature was one of the main tasks of the project as a whole and it involved hacking around the entire technology stack to realise it. Fortunately, I was able to finish one iteration of this big feature by the time my intern was over.

## Something to Thank For
Over the course of my summer internship, I got to interact with some really amazing and inspirational people at Precog@IIIT-D. My intern experience and my takeaways wouldn’t have been possible without their constant guidance and support. I would like to take this opportunity to personally thank them.

[Ponnurangam Kumaraguru “PK”](https://www.facebook.com/ponnurangam.kumaraguru), Associate Professor at IIIT-D, for providing me with the opportunity to be involved with Precog. He was a constant inspiration and made sure everyone was contributing in a significant way, to get the maximum out of the opportunity.

[Archit Srivastava](https://www.facebook.com/archit.sri) and [Yatharth Sharma](https://www.facebook.com/yatharth.sharma.148), Research Associates at IIIT-D, for getting me upto speed with the technology stack and keeping me motivated during the internship with interesting tasks.

[Divyansh Agarwal](https://www.facebook.com/divyansh.agarwal.33), [Kushagra Bhargava](https://www.facebook.com/kushagra.bhargava1) and [Neha Jawalkar](https://www.facebook.com/neha.jawalkar.9), Research Associates at IIIT-D, who assumed project leadership from Archit and Yatharth during this summer break as they were going for higher studies in the US. They were very supportive and let me go about my tasks quite autonomously.

Although, my intern wasn't a typical industry experience, it helped me gain a lot of perspective on my strengths and my drives. Precog was a blessing in disguise.
