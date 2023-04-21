<?php

namespace App\Http\Resources;

use App\Models\Category;
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
            'mainTitle' => $this->main_title,
            'secondTitle' => $this->second_title,
            'photoPass' => $this->photo_pass,
            'photoText' => $this->photo_text,
            'body' => $this->body,
            'category' => $this->category->name,
            'tags' => collect($this->tags)->pluck('name')->toArray(),
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
        ];
    }
}
