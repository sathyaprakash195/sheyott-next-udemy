"use client";
import { Button, Input } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

function SearchShows() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const router = useRouter();
  const onSearch = () => {
    router.push(`/?query=${searchValue}`);
  };

  const onClear = () => {
    setSearchValue("");
    router.push("/");
  };

  return (
    <div className="flex gap-5">
      <Input
        placeholder="Search for shows"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="flex gap-5">
        <Button onClick={onClear}>Clear</Button>
        <Button type="primary" onClick={onSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchShows;
