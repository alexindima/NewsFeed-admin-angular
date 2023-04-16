<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'main_title' => $this->main_title,
            'second_title' => $this->second_title,
            'photo_pass' => $this->photo_pass,
            'photo_text' => $this->photo_text,
            'body' => $this->body,
            'category_id' => $this->category_id,
            'tag_ids' => collect($this->tags)->pluck('id')->toArray(),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
