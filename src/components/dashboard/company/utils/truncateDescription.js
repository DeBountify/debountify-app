export const truncateDescription = (description) => {
    const strippedTags = description?.replace(/(<([^>]+)>)/gi, "");
    const words = strippedTags?.split(" ");
    if (words?.length > 13) {
      return words?.slice(0, 12).join(" ") + " ...";
    }
    return strippedTags;
  };