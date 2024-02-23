---
title: Common SQL Conundrums - Gaps and Islands
description: Gaps and Islands can cause some serious issues during data analysis. Learn how to identify and resolve them.
keywords: [sql, gaps and islands, olap, data]
categories: [sql, data, programming]
isFeatured: true
lastUpdated: 2024-02-07
---

If there's one conundrum that I always run into when working with SQL, it's gaps and islands.

The "gaps and islands" issue involves identifying continuous data groups ("islands") and areas where data is absent ("gaps") within a sequence. While it may seem obscure initially, mastering solutions to this problem is crucial for proficient SQL users. These data breakpoints signify significant business events like peak sales periods or highlight missing data.

## A Digital Example

In the world of data analysis, accurately interpreting user behavior is crucial for making informed decisions. However, the data we work with, no matter how clean or documented, can naturally be limited by the nature of the format it exists in. For example, consider the following dataset:

<div class="scroll-x">
    <table id="table-1">
    <caption>Table 1: Dataset that tracks active user sessions.</caption>
        <thead>
            <tr>
                <th scope="col">User_ID</th>
                <th scope="col" class="numeric">Session_Start</th>
                <th scope="col" class="numeric">Session_End</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td class="numeric">2024-02-01 08:00:00</td>
                <td class="numeric">2024-02-01 09:00:00</td>
            </tr>
            <tr>
                <td>1</td>
                <td class="numeric">2024-02-01 08:30:00</td>
                <td class="numeric">2024-02-01 09:30:00</td>
            </tr>
            <tr>
                <td>1</td>
                <td class="numeric">2024-02-01 10:00:00</td>
                <td class="numeric">2024-02-01 11:00:00</td>
            </tr>
            <tr>
                <td>1</td>
                <td class="numeric">2024-02-02 08:00:00</td>
                <td class="numeric">2024-02-02 09:00:00</td>
            </tr>
            <tr>
                <td>2</td>
                <td class="numeric">2024-02-01 09:00:00</td>
                <td class="numeric">2024-02-01 10:00:00</td>
            </tr>
            <tr>
                <td>2</td>
                <td class="numeric">2024-02-01 09:30:00</td>
                <td class="numeric">2024-02-01 11:30:00</td>
            </tr>
            <tr>
                <td>2</td>
                <td class="numeric">2024-02-03 09:00:00</td>
                <td class="numeric">2024-02-03 10:00:00</td>
            </tr>
            <tr>
                <td>3</td>
                <td class="numeric">2024-02-01 10:00:00</td>
                <td class="numeric">2024-02-05 10:00:00</td>
            </tr>
            <tr>
                <td>4</td>
                <td class="numeric">2024-02-02 12:00:00</td>
                <td class="numeric">2024-02-02 12:30:00</td>
            </tr>
            <tr>
                <td>4</td>
                <td class="numeric">2024-02-03 15:00:00</td>
                <td class="numeric">2024-02-03 15:30:00</td>
            </tr>
        </tbody>
    </table>
</div>

This dataset includes four users, each with a variety of session patterns including overlapping sessions, continuous usage without gaps, and minimal, sporadic usage. A user may have more than one session open at a time, or they may not have one open at all. With the data that we have in its current format, we could figure out how long an average session is, but it couldn't tell us things like how long a user is online at a time, or how long periods of inactivity are before they return.

Gaps and islands are pretty common in different datasets and they can show up in various ways. Sometimes, you'll find them in sequences represented by numbers, like what you'd see in typical databases. When you're trying to deal with these gaps, it's often about figuring out which records got deleted from the sequence. 

Our example exhibits the issues with time-based data, i.e. you're trying to figure out when things were active or not. 
Figuring out where the islands and gaps like can make or break historical data models working with event-level data built into a warehouse or pipeline.

Note:  To work with this data in PostgreSQL, you can use the following SQL query to create a table and insert the data:

```sql
CREATE TABLE user_sessions (
    User_ID INT,
    Session_Start TIMESTAMP,
    Session_End TIMESTAMP
);

INSERT INTO user_sessions (User_ID, Session_Start, Session_End) VALUES
(1, '2024-02-01 08:00:00', '2024-02-01 09:00:00'),
(1, '2024-02-01 08:30:00', '2024-02-01 09:30:00'),
(1, '2024-02-01 10:00:00', '2024-02-01 11:00:00'),
(2, '2024-02-01 09:00:00', '2024-02-01 10:00:00'),
(2, '2024-02-01 09:30:00', '2024-02-01 11:30:00'),
(3, '2024-02-01 10:00:00', '2024-02-01 12:00:00'),
(3, '2024-02-01 11:30:00', '2024-02-01 13:30:00');
```

## The SQL Query

To analyze this data in the way that we want to, we have to transform it first. We'll need a SQL query that can identify both islands (continuous session periods) and gaps (periods of inactivity). This query involves several steps, including using window functions to determine session boundaries and gaps between sessions.

Below is a PostgreSQL query that demonstrates how to identify islands and gaps for each user. The query focuses on generating a comprehensive view of user activity, categorizing each period as either an "Island" (active session) or a "Gap" (inactive period).

```sql
WITH ranked_sessions AS (
    SELECT
        User_ID,
        Session_Start,
        Session_End,
        LAG(Session_End) OVER(PARTITION BY User_ID ORDER BY Session_Start) AS Previous_Session_End,
        LEAD(Session_Start) OVER(PARTITION BY User_ID ORDER BY Session_Start) AS Next_Session_Start
    FROM user_sessions
),
islands AS (
    SELECT
        User_ID,
        Session_Start,
        Session_End,
        CASE
            WHEN Previous_Session_End IS NULL OR Session_Start > Previous_Session_End THEN 'Island'
            ELSE 'Overlap' END AS Session_Type
    FROM ranked_sessions
),
gaps AS (
    SELECT
        User_ID,
        Previous_Session_End AS Gap_Start,
        Session_Start AS Gap_End
    FROM ranked_sessions
    WHERE Previous_Session_End IS NOT NULL AND Session_Start > Previous_Session_End
),
combined AS (
    SELECT
        User_ID,
        Session_Start AS Start_Time,
        Session_End AS End_Time,
        'Island' AS Type
    FROM islands
    WHERE Session_Type = 'Island'
    UNION ALL
    SELECT
        User_ID,
        Gap_Start AS Start_Time,
        Gap_End AS End_Time,
        'Gap' AS Type
    FROM gaps
)
SELECT * FROM combined
ORDER BY User_ID, Start_Time;
```

This query first identifies the start and end times of each user's sessions, then determines whether each session represents an island or is part of an overlapping period. Gaps are identified by comparing the end time of one session with the start time of the next session for each user.

The output would be as follows:

<div class="scroll-x">
    <table id="table-1">
    <caption>Table 1: Dataset that tracks active user sessions.</caption>
        <thead>
            <tr>
                <th scope="col">User_ID</th>
                <th scope="col" class="numeric">Start_Time</th>
                <th scope="col" class="numeric">End_Time</th>
                <th scope="col" class="numeric">Type</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td class="datetime" data-datetime="2024-02-01 08:00:00">2024-02-01 08:00:00</td>
                <td class="datetime" data-datetime="2024-02-01 11:00:00">2024-02-01 11:00:00</td>
                <td>Island</td>
            </tr>
            <tr>
                <td>1</td>
                <td class="datetime" data-datetime="2024-02-01 11:00:00">2024-02-01 11:00:00</td>
                <td class="datetime" data-datetime="2024-02-02 08:00:00">2024-02-02 08:00:00</td>
                <td>Gap</td>
            </tr>
            <tr>
                <td>1</td>
                <td class="datetime" data-datetime="2024-02-02 08:00:00">2024-02-02 08:00:00</td>
                <td class="datetime" data-datetime="2024-02-02 09:00:00">2024-02-02 09:00:00</td>
                <td>Island</td>
            </tr>
            <tr>
                <td>2</td>
                <td class="datetime" data-datetime="2024-02-01 09:00:00">2024-02-01 09:00:00</td>
                <td class="datetime" data-datetime="2024-02-01 11:30:00">2024-02-01 11:30:00</td>
                <td>Island</td>
            </tr>
            <tr>
                <td>2</td>
                <td class="datetime" data-datetime="2024-02-01 11:30:00">2024-02-01 11:30:00</td>
                <td class="datetime" data-datetime="2024-02-03 09:00:00">2024-02-03 09:00:00</td>
                <td>Gap</td>
            </tr>
            <tr>
                <td>2</td>
                <td class="datetime" data-datetime="2024-02-03 09:00:00">2024-02-03 09:00:00</td>
                <td class="datetime" data-datetime="2024-02-03 10:00:00">2024-02-03 10:00:00</td>
                <td>Island</td>
            </tr>
            <tr>
                <td>3</td>
                <td class="datetime" data-datetime="2024-02-01 10:00:00">2024-02-01 10:00:00</td>
                <td class="datetime" data-datetime="2024-02-05 10:00:00">2024-02-05 10:00:00</td>
                <td>Island</td>
            </tr>
            <tr>
                <td>4</td>
                <td class="datetime" data-datetime="2024-02-02 12:00:00">2024-02-02 12:00:00</td>
                <td class="datetime" data-datetime="2024-02-02 12:30:00">2024-02-02 12:30:00</td>
                <td>Island</td>
            </tr>
            <tr>
                <td>4</td>
                <td class="datetime" data-datetime="2024-02-02 12:30:00">2024-02-02 12:30:00</td>
                <td class="datetime" data-datetime="2024-02-03 15:00:00">2024-02-03 15:00:00</td>
                <td>Gap</td>
            </tr>
            <tr>
                <td>4</td>
                <td class="datetime" data-datetime="2024-02-03 15:00:00">2024-02-03 15:00:00</td>
                <td class="datetime" data-datetime="2024-02-03 15:30:00">2024-02-03 15:30:00</td>
                <td>Island</td>
            </tr>
        </tbody>
    </table>
</div>

## Analytics and Implications

The output from our SQL query offers a detailed view of how users interact with the platform over time. Here are some quick insights drawn from the hypothetical results:

User 1 displays a pattern of frequent, overlapping sessions with a significant gap, indicating regular but interrupted usage.
User 2 shows both continuous activity on specific days and significant inactivity, suggesting episodic engagement.
User 3's continuous long-term session indicates a deep, uninterrupted engagement with the platform.
User 4 represents a user with minimal and sporadic engagement, characterized by short sessions and long gaps.

So what kind of strategies can we derive from this analysis? 

- Customized Engagement: For users like User 1, timely re-engagement strategies can be designed to minimize gaps.

- Feature Promotion: The continuous engagement of users like User 3 might be leveraged to promote premium features or extended sessions.

- User Support: Identifying patterns like those of User 4 could indicate users struggling to engage, highlighting opportunities for targeted support or user education.

