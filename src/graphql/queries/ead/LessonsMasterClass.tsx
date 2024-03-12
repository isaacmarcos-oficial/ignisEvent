import { gql } from "@apollo/client";

export const GET_LESSONS = gql`
  query {
    allLessonsClass {
      id
      title
      videoUrl
      description
      lessonType
      availableAt
      teacherName
      teacherAvatar
      teacherBio
    }
  }
`;

export const GET_LESSONS_FILTER = gql`
  query ($sender: String!, $message: String!) {
    chatMessageFilter(sender: $sender, message: $message) {
      id
      title
      videoUrl
      description
      lessonType
      availableAt
      teacherName
      teacherAvatar
      teacherBio
    }
  }
`;

export const GET_LESSONS_BY_ID = gql`
  query ($id: String!) {
    lessonClass(id: $id) {
      id
      title
      videoUrl
      description
      lessonType
      availableAt
      teacherName
      teacherAvatar
      teacherBio
    }
  }
`;
